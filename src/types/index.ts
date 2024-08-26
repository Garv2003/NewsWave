type BlogProps = {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
};

type NewsProps = {
    status: string;
    totalResults: number;
    articles: BlogProps[];
};


export type { BlogProps, NewsProps };