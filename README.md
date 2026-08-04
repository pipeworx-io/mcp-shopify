# mcp-shopify

Shopify MCP Pack — wraps the Shopify Admin REST API (2024-01)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `shopify_list_products` | List products from a Shopify store. Returns up to 50 products by default. |
| `shopify_get_product` | Fetch a single Shopify product by numeric ID, returning its title, description, variants, pricing, inventory, and images via the Admin API. |
| `shopify_list_orders` | List orders from a Shopify store, optionally filtered by status. |
| `shopify_get_order` | Fetch a single Shopify order by numeric ID, returning line items, customer info, fulfillment status, totals, and shipping address via the Admin API. |
| `shopify_list_customers` | List customers in a Shopify store (up to 250 per call). Returns customer IDs, names, emails, order counts, and total spend. Requires Admin API access token and shop domain. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "shopify": {
      "url": "https://gateway.pipeworx.io/shopify/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Shopify data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
