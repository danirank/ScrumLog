using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ScrumLog.API.Data
{
    /// <inheritdoc />
    public partial class UpdatedEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meetings_Sprints_SprintId",
                table: "Meetings");

            migrationBuilder.AlterColumn<Guid>(
                name: "SprintId",
                table: "Meetings",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Meetings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Meetings_Sprints_SprintId",
                table: "Meetings",
                column: "SprintId",
                principalTable: "Sprints",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meetings_Sprints_SprintId",
                table: "Meetings");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Meetings");

            migrationBuilder.AlterColumn<Guid>(
                name: "SprintId",
                table: "Meetings",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Meetings_Sprints_SprintId",
                table: "Meetings",
                column: "SprintId",
                principalTable: "Sprints",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
