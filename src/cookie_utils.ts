import cookies from "../public/cookies.json"

export interface Recipe {
    source: string,
    source_name: string,
    image_name: string,
    recipe_name: string,
    cake_flour: number
    all_purpose_flour: number,
    bread_flour: 0,
    baking_soda: number,
    baking_powder: number,
    ice: number,
    milk: number,
    butter: number,
    brown_butter: number,
    white_sugar: number,
    corn_starch: number,
    light_brown_sugar: number,
    dark_brown_sugar: number,
    eggs: number,
    egg_yolks: number,
    vanilla_extract: number,
    salt: number,
    salt_size: string,
    chocolate: number,
    cookie_size: 55.000,
    min_bake_time: number,
    max_bake_time: number,
    bake_temp: number,
    metrics?: RecipeMetrics
}

export interface RecipeMetrics {
    total_flour: number,
    total_sugar: number,
    total_leavening: number,
    total_protein: number,
    total_fat: number
}

export function get_recipes(): Recipe[] {
    let recipes: Recipe[] = [];

    for(let recipe in cookies.recipes) {
        let parsed_recipe: Recipe = JSON.parse(JSON.stringify(cookies.recipes[recipe]));
        if(!parsed_recipe.ice) {
            parsed_recipe.ice = 0;
        }
        if(!parsed_recipe.milk) {
            parsed_recipe.milk = 0;
        }
        if(!parsed_recipe.cake_flour) {
            parsed_recipe.cake_flour = 0;
        }
        if(!parsed_recipe.bread_flour) {
            parsed_recipe.bread_flour = 0;
        }
        if(!parsed_recipe.all_purpose_flour) {
            parsed_recipe.all_purpose_flour = 0;
        }
        if(!parsed_recipe.light_brown_sugar) {
            parsed_recipe.light_brown_sugar = 0;
        }
        if(!parsed_recipe.dark_brown_sugar) {
            parsed_recipe.dark_brown_sugar = 0;
        }
        if(!parsed_recipe.white_sugar) {
            parsed_recipe.white_sugar = 0;
        }
        if(!parsed_recipe.corn_starch) {
            parsed_recipe.corn_starch = 0;
        }
        if(!parsed_recipe.salt) {
            parsed_recipe.salt = 0;
        }
        if(!parsed_recipe.salt_size) {
            parsed_recipe.salt_size = "";
        }

        recipes.push(parsed_recipe);
    }

    return recipes;
}