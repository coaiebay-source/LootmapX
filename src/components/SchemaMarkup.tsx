export default function SchemaMarkup({ type, data }: { type: 'Auction' | 'Product' | 'FAQ', data: any }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": type,
        ...data
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
