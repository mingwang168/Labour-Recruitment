using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace labourRecruitment.Migrations
{
    public partial class AddedOnLeavetoLabourer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isAvailable",
                table: "Labourer",
                newName: "onLeave");

            migrationBuilder.AlterColumn<DateTime>(
                name: "date",
                table: "LabourerAttendance",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "date",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "OnLeave",
                table: "Labourer",
                nullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "safety_meeting_completed",
                table: "JobLabourer",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "total_hired",
                table: "Job",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OnLeave",
                table: "Labourer");

            migrationBuilder.RenameColumn(
                name: "onLeave",
                table: "Labourer",
                newName: "isAvailable");

            migrationBuilder.AlterColumn<DateTime>(
                name: "date",
                table: "LabourerAttendance",
                type: "date",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "date");

            migrationBuilder.AlterColumn<bool>(
                name: "safety_meeting_completed",
                table: "JobLabourer",
                nullable: true,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<int>(
                name: "total_hired",
                table: "Job",
                nullable: true,
                oldClrType: typeof(int));
        }
    }
}
