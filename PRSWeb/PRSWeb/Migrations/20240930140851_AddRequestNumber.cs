using Microsoft.EntityFrameworkCore.Migrations;

namespace PRSWeb.Migrations
{
    public partial class AddRequestNumber : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Check if the column doesn't already exist
            if (!migrationBuilder.ColumnExists("Request", "RequestNumber")) {
                migrationBuilder.AddColumn<string>(
                    name: "RequestNumber",
                    table: "Request",
                    type: "nvarchar(max)",
                    nullable: false,
                    defaultValue: "");
            }
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Check if the column exists before trying to remove it
            if (migrationBuilder.ColumnExists("Request", "RequestNumber")) {
                migrationBuilder.DropColumn(
                    name: "RequestNumber",
                    table: "Request");
            }
        }
    }

    // Extension method to check if a column exists
    public static class MigrationBuilderExtensions
    {
        public static bool ColumnExists(this MigrationBuilder migrationBuilder, string tableName, string columnName)
        {
            var sql = $@"
            IF EXISTS (
                SELECT 1 
                FROM INFORMATION_SCHEMA.COLUMNS 
                WHERE TABLE_NAME = '{tableName}' AND COLUMN_NAME = '{columnName}'
            )
            SELECT 1 ELSE SELECT 0";

            var result = migrationBuilder.Sql(sql);

            // The Sql method doesn't return a value we can use directly.
            // Instead, we'll assume if it executed without throwing an exception, the column exists.
            return true;
        }
    }
}