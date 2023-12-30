import { MetadataRoute } from 'next'
import type { GetStaticProps } from "next";
import {get_recipes} from "@/cookie_utils";

export default function SiteMap(): MetadataRoute.Sitemap {
    const domain: string = "https://cookies-only.com";

    let sitemap_urls: MetadataRoute.Sitemap = [
        {
            url: `${domain}/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
    ];

    const recipes = get_recipes();
    for (const recipe of recipes) {
        sitemap_urls.push( {
            url: `${domain}/cookies/${recipe.source_name}/${recipe.recipe_name}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        } );
    }

    return sitemap_urls;
}