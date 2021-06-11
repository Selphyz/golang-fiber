package routes

import (
	"server/controllers"
	"server/middleware"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App){
	app.Get("/api/hello", controllers.Hello)
	app.Post("/api/register", controllers.Register)
	app.Post("/api/login", controllers.Login)
	app.Use(middleware.IsAuthenticated)
	app.Get("/api/user", controllers.User)
	app.Post("/api/logout", controllers.Logout)

	app.Get("/api/users", controllers.AllUsers)
	app.Get("/api/users/:id", controllers.GetUser)
	app.Post("/api/users", controllers.CreateUser)
	app.Put("/api/users/:id", controllers.UpdateUser)
	app.Delete("/api/users/:id", controllers.DeleteUser)
}