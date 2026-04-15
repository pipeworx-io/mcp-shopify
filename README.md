# mcp-shopify

Shopify MCP Pack — wraps the Shopify Admin REST API (2024-01)

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `shopify_list_products` | List products from a Shopify store. Returns up to 50 products by default. |
| `shopify_get_product` | Get a single product by ID from a Shopify store. |
| `shopify_list_orders` | List orders from a Shopify store, optionally filtered by status. |
| `shopify_get_order` | Get a single order by ID from a Shopify store. |
| `shopify_list_customers` | List customers from a Shopify store. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "shopify": {
      "url": "https://gateway.pipeworx.io/shopify/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use shopify
```

## License

MIT
