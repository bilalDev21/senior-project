using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Back_end.Migrations
{
    /// <inheritdoc />
    public partial class version5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Tools",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Tools",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Tools");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Tools");
        }
    }
}
