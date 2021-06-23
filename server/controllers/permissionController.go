package controllers

import (
	"server/database"
	"server/middleware"
	"server/models"

	"github.com/gofiber/fiber/v2"
)

func AllPermissions(c *fiber.Ctx) error {
	if err := middleware.IsAuthorized(c, "roles"); err != nil{
		return err
	}
	var permissions []models.Permission
	database.DB.Find(&permissions)
	return c.JSON(permissions)
}