# mcp-shopify

Shopify MCP Pack — wraps the Shopify Admin REST API (2024-01)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 250+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `shopify_list_products` | List products from a Shopify store. Returns up to 50 products by default. |
| `shopify_get_product` | Get a single product by ID from a Shopify store. |
| `shopify_list_orders` | List orders from a Shopify store, optionally filtered by status. |
| `shopify_get_order` | Get a single order by ID from a Shopify store. |
| `shopify_list_customers` | List customers from a Shopify store. |

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

Or connect to the full Pipeworx gateway for access to all 250+ data sources:

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

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
