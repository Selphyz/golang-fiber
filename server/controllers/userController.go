package controllers

import (
	"server/database"
	"server/middleware"
	"server/models"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func AllUsers(c *fiber.Ctx) error {
	// if err := middleware.IsAuthorized(c, "users"); err != nil{
	// 	return err
	// }
	page, _ := strconv.Atoi(c.Query("page", "1"))
	limit := 5
	offset := (page - 1) * limit
	var total int64
	var users []models.User
	database.DB.Preload("Role").Offset(offset).Limit(limit).Find(&users)
	database.DB.Model(&models.User{}).Count(&total)
	return c.JSON(fiber.Map{
		"data": users,
		"meta": fiber.Map{
			"total":		total,
			"page":			page,
			"last_page":	int(total)/limit, 
		},
	})
}

func GetUser(c *fiber.Ctx) error {
	if err := middleware.IsAuthorized(c, "users"); err != nil{
		return err
	}
	id, _ := strconv.Atoi(c.Params("id"))
	users := models.User{
		Id: uint(id),
	}
	database.DB.Preload("Role").Find(&users)
	return c.JSON(users)
}

func CreateUser(c *fiber.Ctx) error {
	if err := middleware.IsAuthorized(c, "users"); err != nil{
		return err
	}
	var user models.User
	if err := c.BodyParser(&user); err != nil {
		return err
	}
	user.SetPassword("1234")
	database.DB.Create(&user)
	return c.JSON(user)
}

func UpdateUser(c *fiber.Ctx) error {
	if err := middleware.IsAuthorized(c, "users"); err != nil{
		return err
	}
	id, _ := strconv.Atoi(c.Params("id"))
	user := models.User{
		Id: uint(id),
	}
	if err := c.BodyParser(&user); err != nil {
		return err
	}
	database.DB.Model(&user).Updates(user)
	return c.JSON(user)
}

func DeleteUser(c *fiber.Ctx) error {
	if err := middleware.IsAuthorized(c, "users"); err != nil{
		return err
	}
	id, _ := strconv.Atoi(c.Params("id"))
	user := models.User{
		Id: uint(id),
	}
	database.DB.Delete(&user)
	return nil
}