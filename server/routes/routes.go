package routes

import (
	"server/controllers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App){
	app.Get("/api/hello", controllers.Hello)
	app.Get("/api/user", controllers.User)
	app.Post("/api/register", controllers.Register)
	app.Post("/api/login", controllers.Login)
	app.Post("/api/logout", controllers.Logout)
}