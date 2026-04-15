interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * Shopify MCP Pack — wraps the Shopify Admin REST API (2024-01)
 *
 * BYO key: _apiKey = Shopify Admin API access token, _shop = shop domain.
 * Tools: list/get products, list/get orders, list customers.
 */


async function shopifyFetch(shop: string, apiKey: string, path: string): Promise<unknown> {
  const url = `https://${shop}/admin/api/2024-01${path}`;
  const res = await fetch(url, {
    headers: {
      'X-Shopify-Access-Token': apiKey,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shopify API error (${res.status}): ${text}`);
  }
  return res.json();
}

const tools: McpToolExport['tools'] = [
  {
    name: 'shopify_list_products',
    description: 'List products from a Shopify store. Returns up to 50 products by default.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        _apiKey: { type: 'string', description: 'Shopify Admin API access token' },
        _shop: { type: 'string', description: 'Shop domain (e.g., mystore.myshopify.com)' },
        limit: { type: 'number', description: 'Number of products to return (max 250, default 50)' },
      },
      required: ['_apiKey', '_shop'],
    },
  },
  {
    name: 'shopify_get_product',
    description: 'Get a single product by ID from a Shopify store.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        _apiKey: { type: 'string', description: 'Shopify Admin API access token' },
        _shop: { type: 'string', description: 'Shop domain (e.g., mystore.myshopify.com)' },
        id: { type: 'number', description: 'Product ID' },
      },
      required: ['_apiKey', '_shop', 'id'],
    },
  },
  {
    name: 'shopify_list_orders',
    description: 'List orders from a Shopify store, optionally filtered by status.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        _apiKey: { type: 'string', description: 'Shopify Admin API access token' },
        _shop: { type: 'string', description: 'Shop domain (e.g., mystore.myshopify.com)' },
        status: { type: 'string', description: 'Filter by status: open, closed, cancelled, any (default: open)' },
        limit: { type: 'number', description: 'Number of orders to return (max 250, default 50)' },
      },
      required: ['_apiKey', '_shop'],
    },
  },
  {
    name: 'shopify_get_order',
    description: 'Get a single order by ID from a Shopify store.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        _apiKey: { type: 'string', description: 'Shopify Admin API access token' },
        _shop: { type: 'string', description: 'Shop domain (e.g., mystore.myshopify.com)' },
        id: { type: 'number', description: 'Order ID' },
      },
      required: ['_apiKey', '_shop', 'id'],
    },
  },
  {
    name: 'shopify_list_customers',
    description: 'List customers from a Shopify store.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        _apiKey: { type: 'string', description: 'Shopify Admin API access token' },
        _shop: { type: 'string', description: 'Shop domain (e.g., mystore.myshopify.com)' },
        limit: { type: 'number', description: 'Number of customers to return (max 250, default 50)' },
      },
      required: ['_apiKey', '_shop'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  const apiKey = args._apiKey as string;
  const shop = args._shop as string;

  switch (name) {
    case 'shopify_list_products': {
      const limit = (args.limit as number) ?? 50;
      return shopifyFetch(shop, apiKey, `/products.json?limit=${limit}`);
    }

    case 'shopify_get_product': {
      const id = args.id as number;
      return shopifyFetch(shop, apiKey, `/products/${id}.json`);
    }

    case 'shopify_list_orders': {
      const status = (args.status as string) ?? 'open';
      const limit = (args.limit as number) ?? 50;
      return shopifyFetch(shop, apiKey, `/orders.json?status=${status}&limit=${limit}`);
    }

    case 'shopify_get_order': {
      const id = args.id as number;
      return shopifyFetch(shop, apiKey, `/orders/${id}.json`);
    }

    case 'shopify_list_customers': {
      const limit = (args.limit as number) ?? 50;
      return shopifyFetch(shop, apiKey, `/customers.json?limit=${limit}`);
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export default { tools, callTool, meter: { credits: 10 } } satisfies McpToolExport;
