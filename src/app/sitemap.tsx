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

    return sitemap_urls;
}