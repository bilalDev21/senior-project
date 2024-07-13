using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Back_end.Migrations
{
    /// <inheritdoc />
    public partial class version4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_reportHistories_UserId",
                table: "reportHistories",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_reportHistories_Users_UserId",
                table: "reportHistories",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_reportHistories_Users_UserId",
                table: "reportHistories");

            migrationBuilder.DropIndex(
                name: "IX_reportHistories_UserId",
                table: "reportHistories");
        }
    }
}
