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
    metrics?: RecipeMetrics,
    id: string,
}

export interface RecipeMetrics {
    total_flour: number,
    total_sugar: number,
    total_leavening: number,
    total_protein: number,
    total_fat: number,
}

export function scale_recipe(original_recipe: Recipe, scale: number): Recipe {
    
    let recipe = structuredClone(original_recipe);

    recipe.cake_flour *= scale;
    recipe.all_purpose_flour *= scale;
    recipe.bread_flour *= scale;

    recipe.baking_soda *= scale;
    recipe.baking_powder *= scale;

    recipe.ice *= scale;
    recipe.milk *= scale;
    recipe.butter *= scale;
    recipe.brown_butter *= scale;
    recipe.white_sugar *= scale;
    recipe.corn_starch *= scale;
    recipe.light_brown_sugar *= scale;
    recipe.dark_brown_sugar *= scale;
    recipe.eggs *= scale;
    recipe.egg_yolks *= scale;
    recipe.vanilla_extract *= scale;

    recipe.salt *= scale;
    recipe.chocolate *= scale;

    const {cake_flour, bread_flour, all_purpose_flour, light_brown_sugar, dark_brown_sugar, white_sugar, baking_powder, baking_soda, butter, eggs, egg_yolks, brown_butter, milk } = recipe;

    const total_flour = cake_flour + bread_flour + all_purpose_flour;
    const total_sugar = light_brown_sugar + dark_brown_sugar + white_sugar;
    const total_leavening = baking_soda + baking_powder;
    const total_protein = (bread_flour * 0.127) + (all_purpose_flour * 0.117) + (cake_flour * 0.1) + (eggs * 0.12) + (egg_yolks * 0.15882) + (milk * 0.03333);
    const total_fat = (butter * 0.8) + (egg_yolks * 0.26471) +  (milk * 0.03333) + (brown_butter * 0.8);

    const recipe_metrics: RecipeMetrics = {
        total_flour,
        total_sugar,
        total_leavening,
        total_protein,
        total_fat
    }

    recipe.metrics = recipe_metrics;

    return recipe;
}

export function get_recipes(): Map<string, Recipe> {
    let recipes: Map<string, Recipe> = new Map();

    let i = 0;
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
        if(!parsed_recipe.baking_soda) {
            parsed_recipe.baking_soda = 0;
        }
        if(!parsed_recipe.butter) {
            parsed_recipe.butter = 0;
        }
        if(!parsed_recipe.brown_butter) {
            parsed_recipe.brown_butter = 0;
        }
        if(!parsed_recipe.eggs) {
            parsed_recipe.eggs = 0;
        }
        if(!parsed_recipe.egg_yolks) {
            parsed_recipe.egg_yolks = 0;
        }
        if(!parsed_recipe.baking_powder) {
            parsed_recipe.baking_powder = 0;
        }
        if(!parsed_recipe.salt) {
            parsed_recipe.salt = 0;
        }
        if(!parsed_recipe.salt_size) {
            parsed_recipe.salt_size = "";
        }

        const {cake_flour, bread_flour, all_purpose_flour, light_brown_sugar, dark_brown_sugar, white_sugar, baking_powder, baking_soda, butter, eggs, egg_yolks, brown_butter, milk } = parsed_recipe;

        const total_flour = cake_flour + bread_flour + all_purpose_flour;
        const total_sugar = light_brown_sugar + dark_brown_sugar + white_sugar;
        const total_leavening = baking_soda + baking_powder;
        const total_protein = (bread_flour * 0.127) + (all_purpose_flour * 0.117) + (cake_flour * 0.1) + (eggs * 0.12) + (egg_yolks * 0.15882) + (milk * 0.03333);
        const total_fat = (butter * 0.8) + (egg_yolks * 0.26471) +  (milk * 0.03333) + (brown_butter * 0.8);

        // Generate some estimates on the characteristics of the cookie.
        let crispy_factor = 0.0;
        let cakey_factor = 0.0;
        let spread_factor = 0.0;
        let nutty_factor = 0.2;


        const total_weight =
            parsed_recipe.baking_powder +
            parsed_recipe.baking_soda +
            total_flour +
            total_sugar +
            parsed_recipe.butter +
            parsed_recipe.brown_butter +
            parsed_recipe.vanilla_extract +
            parsed_recipe.ice +
            parsed_recipe.corn_starch +
            parsed_recipe.chocolate +
            parsed_recipe.eggs +
            parsed_recipe.egg_yolks +
            parsed_recipe.salt;

        const total_water_weight =
            total_flour * .14 +
            parsed_recipe.light_brown_sugar * 0.013 +
            parsed_recipe.dark_brown_sugar * 0.021 +
            parsed_recipe.butter * .20 +
            parsed_recipe.brown_butter * .02 +
            parsed_recipe.vanilla_extract * .35 +
            parsed_recipe.ice +
            parsed_recipe.chocolate * .01 +
            parsed_recipe.eggs * .73 +
            parsed_recipe.egg_yolks * .5;


        const water_percentage = total_water_weight / total_flour;
        const water_percentage_string = ((total_water_weight / total_flour) * 100).toFixed(2)

        let corn_starch_factor = parsed_recipe.corn_starch > 0.0 ? 0.3 : 0;
        let cake_flour_factor = parsed_recipe.cake_flour > 0.0 ? 0.2 : 0.0;

        cakey_factor = (.5 * (water_percentage / .5)) + cake_flour_factor;
        crispy_factor = (.8 * (water_percentage / .5)) + corn_starch_factor + -cake_flour_factor;



        if(parsed_recipe.brown_butter > 0.0) {
            nutty_factor += 0.3
        }
        if(parsed_recipe.dark_brown_sugar / total_sugar >= .5) {
            nutty_factor += 0.3
        }

        crispy_factor = Math.min(1.0, crispy_factor)
        cakey_factor = Math.min(1.0, cakey_factor)
        spread_factor = Math.min(1.0, spread_factor)
        nutty_factor = Math.min(1.0, nutty_factor)

        const recipe_metrics: RecipeMetrics = {
            total_flour,
            total_sugar,
            total_leavening,
            total_protein,
            total_fat,
        }

        parsed_recipe.metrics = recipe_metrics;

        recipes.set(parsed_recipe.id, parsed_recipe);
        i += 1;
    }

    return recipes;
}