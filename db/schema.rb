# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_02_27_202918) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cookbooks", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ingredients", force: :cascade do |t|
    t.string "name"
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "measurements", force: :cascade do |t|
    t.float "unit"
    t.string "type_of_measurement"
    t.string "description"
    t.bigint "recipe_id"
    t.bigint "ingredient_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "ingredient_order"
    t.index ["ingredient_id"], name: "index_measurements_on_ingredient_id"
    t.index ["recipe_id"], name: "index_measurements_on_recipe_id"
  end

  create_table "participants", force: :cascade do |t|
    t.string "email"
    t.string "first_name"
    t.string "last_name"
    t.string "system_language"
    t.string "street_address_one"
    t.string "street_address_two"
    t.string "city"
    t.string "country"
    t.string "state_province"
    t.string "postal_code"
    t.string "profession"
    t.string "preferred_name"
    t.string "primary_language"
    t.string "email_preference_language"
    t.string "other_fluent_languages"
    t.string "gender"
    t.string "marital_status"
    t.string "children"
    t.date "birthday"
    t.string "cell_phone"
    t.string "emergency_contact_name"
    t.string "emergency_primary_phone_number"
    t.string "emergency_secondary_phone_number"
    t.string "emergency_time_zone"
    t.string "emergency_country"
    t.bigint "program_id"
    t.index ["program_id"], name: "index_participants_on_program_id"
  end

  create_table "programs", force: :cascade do |t|
    t.string "name"
    t.string "new_tag"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "recipes", force: :cascade do |t|
    t.string "name"
    t.string "protein"
    t.integer "cookbook_page"
    t.string "cusine_region"
    t.string "type_of_food"
    t.boolean "on_the_menu", default: false
    t.boolean "vegetarian", default: false
    t.boolean "vegan", default: false
    t.boolean "dairy_free", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "directions"
    t.integer "multiplier", default: 1
    t.integer "rank"
    t.integer "cookbook_id"
  end

  create_table "sprints", force: :cascade do |t|
    t.date "sprint_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.string "exercies"
    t.index ["user_id"], name: "index_sprints_on_user_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "category"
    t.string "task"
    t.integer "value"
    t.string "day"
    t.bigint "sprint_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.string "status"
    t.integer "confidence_score"
    t.integer "ranks"
    t.index ["sprint_id"], name: "index_tasks_on_sprint_id"
    t.index ["user_id"], name: "index_tasks_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "name"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "role"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "tasks", "sprints"
end
