import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
    name: "Gurt Fan Club (GFC)",
    version: "4.2.0",
    capabilities: {
        tools: {}
    }
});

server.tool(
    "gurt button",
    "skinching gurt digging at pizza ranch now wgat",
    {
        playing: z.boolean().describe("Time traveler: What you playing"),
        minecraftTwo: z.enum(["gat8 Washington", "Minecraft Two"]).describe("gat 8 washington wgat it is"),

    },

    async ({playing, minecraftTwo}) => {
        const res: {
            playing: "gat8 Washington" | "Minecraft Two" | "wgat it is",
            knowNoHurt: "gurt dont" | "even steven" | "odd todd",
            pizzaRanchEmployee: "digging in me" | "furple rain" | "gurt finger"
        } = {
            playing: "wgat it is",
            knowNoHurt: "gurt dont",
            pizzaRanchEmployee: "digging in me"
        };

        if (playing == true) {
            res.playing = minecraftTwo ? "Minecraft Two" : "gat8 Washington";
        }
        return {
            content: [
                {
                    type: "text",
                    text: res.playing
                }
            ]
        }; 
        
    }
)

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("MCP Server running on stdio");
}

main().catch(err => {
    console.error("fatal error in main():", err);
    process.exit(1);
})