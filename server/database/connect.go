package database

import (
	"server/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB
func Connect() {
	db, err := gorm.Open(mysql.Open("root:rootroot@/go_admin"), &gorm.Config{})
	if err != nil {
		panic("Could not connect to the database")
	}
	DB = db
	db.AutoMigrate(&models.User{})
}