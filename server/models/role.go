package models

type Role struct {
	Id			uint			`json:"id"`
	Name 		string			`json:"name" gorm:"unique"`
	Permissions []Permission	`json:"permisions" gorm:"many2many:role_permissions"`
}