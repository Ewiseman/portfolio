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

ActiveRecord::Schema.define(version: 2019_01_16_223937) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

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
    t.integer "order"
    t.index ["ingredient_id"], name: "index_measurements_on_ingredient_id"
    t.index ["recipe_id"], name: "index_measurements_on_recipe_id"
  end

  create_table "recipes", force: :cascade do |t|
    t.string "name"
    t.string "protein"
    t.string "cookbook"
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
  end

  create_table "scrum_dates", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.date "sprint_date"
  end

  create_table "sprints", force: :cascade do |t|
    t.date "sprint_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tasks", force: :cascade do |t|
    t.string "category"
    t.string "task"
    t.integer "value"
    t.string "day"
    t.bigint "sprint_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["sprint_id"], name: "index_tasks_on_sprint_id"
  end

  add_foreign_key "tasks", "sprints"
end
