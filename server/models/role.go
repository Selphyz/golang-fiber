package models

type Role struct {
	Id			uint			`json:"id"`
	Name 		string			`json:"name" gorm:"unique"`
	Permissions []Permission	`json:"permissions" gorm:"many2many:role_permissions"`
}