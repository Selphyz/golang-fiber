package controllers

import (
	"server/database"
	"server/models"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

func Hello(c *fiber.Ctx) error {
	return c.SendString("Hello")
}
func Register(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err!=nil {
		return err
	}

	if data["password"] != data["password_confirm"] {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "password missmatch",
		})
	}
	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)
	user := models.User{
		FirstName: data["first_name"],
		LastName:  data["last_name"],
		Email:     data["email"],
		Password:  password,
	}
	result := database.DB.Create(&user)
	if result.Error != nil{
		return c.JSON(result.Error)
	}
	database.DB.Create(&user)
	return c.JSON(user)

}
func Login(c *fiber.Ctx) error {
	var data map[string]string
	if err:=c.BodyParser(&data); err != nil{
		return err
	}
	var user models.User
	database.DB.Where("email = ?", data["email"]).First(&user)
	// Check registered email
	if user.Id == 0{
		c.Status(403)
		return c.JSON(fiber.Map{
			"message": "invalid credentials",
		})
	}
	// Password Check
	if err:= bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil{
		c.Status(403)
		return c.JSON(fiber.Map{
			"message": "invalid credentials",
		})
	}
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer: strconv.Itoa(int(user.Id)),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	})
	token, err := claims.SignedString([]byte("secret"))
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}
	cookie := fiber.Cookie{
		Name:		"jwt",
		Value:  	token,
		Expires:	time.Now().Add(time.Hour*24),
		HTTPOnly:   true,
	}
	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message": "success",
	})
}
type Claims struct {
	jwt.StandardClaims
}
func User(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &Claims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte("secret"), nil
	})
	if err != nil || !token.Valid{
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}
	claims := token.Claims.(*Claims)
	var user models.User
	database.DB.Where("id = ?", claims.Issuer).First(&user)
	return c.JSON(user)
}
func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name: 		"jwt",
		Value:		"",
		Expires:	time.Now().Add(-time.Hour),
		HTTPOnly:   true,
	}
	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message": "success",
	})
}