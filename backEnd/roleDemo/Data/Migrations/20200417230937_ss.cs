using Microsoft.EntityFrameworkCore.Migrations;

namespace roleDemo.Data.Migrations
{
    public partial class ss : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LabourerSkill_Labourers_LabourerID",
                table: "LabourerSkill");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LabourerSkill",
                table: "LabourerSkill");

            migrationBuilder.RenameTable(
                name: "LabourerSkill",
                newName: "LabourerSkills");

            migrationBuilder.RenameIndex(
                name: "IX_LabourerSkill_LabourerID",
                table: "LabourerSkills",
                newName: "IX_LabourerSkills_LabourerID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LabourerSkills",
                table: "LabourerSkills",
                column: "LabourerSkillID");

            migrationBuilder.AddForeignKey(
                name: "FK_LabourerSkills_Labourers_LabourerID",
                table: "LabourerSkills",
                column: "LabourerID",
                principalTable: "Labourers",
                principalColumn: "LabourerID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LabourerSkills_Labourers_LabourerID",
                table: "LabourerSkills");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LabourerSkills",
                table: "LabourerSkills");

            migrationBuilder.RenameTable(
                name: "LabourerSkills",
                newName: "LabourerSkill");

            migrationBuilder.RenameIndex(
                name: "IX_LabourerSkills_LabourerID",
                table: "LabourerSkill",
                newName: "IX_LabourerSkill_LabourerID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LabourerSkill",
                table: "LabourerSkill",
                column: "LabourerSkillID");

            migrationBuilder.AddForeignKey(
                name: "FK_LabourerSkill_Labourers_LabourerID",
                table: "LabourerSkill",
                column: "LabourerID",
                principalTable: "Labourers",
                principalColumn: "LabourerID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
