using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace labourRecruitment.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "safety_meeting_date",
                table: "JobLabourer",
                type: "datetime",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "total_hired",
                table: "Job",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "safety_meeting_date",
                table: "JobLabourer");

            migrationBuilder.DropColumn(
                name: "total_hired",
                table: "Job");
        }
    }
}
