package util

import (
	"server/models"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func PaginateProducts(db *gorm.DB, entity models.Entity, page int) fiber.Map {
	limit := 5
	offset := (page - 1) * limit
	total := entity.Count(db)
	data := entity.Take(db, limit, offset)
	return fiber.Map{
		"data": data,
		"meta": fiber.Map{
			"total":		total,
			"page":			page,
			"last_page":	int(total)/limit, 
		},
	}
}