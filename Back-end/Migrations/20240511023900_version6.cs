using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Back_end.Migrations
{
    /// <inheritdoc />
    public partial class version6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_orders_ToolId",
                table: "orders");

            migrationBuilder.CreateIndex(
                name: "IX_orders_ToolId",
                table: "orders",
                column: "ToolId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_orders_ToolId",
                table: "orders");

            migrationBuilder.CreateIndex(
                name: "IX_orders_ToolId",
                table: "orders",
                column: "ToolId",
                unique: true);
        }
    }
}
