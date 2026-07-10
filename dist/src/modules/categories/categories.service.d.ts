export declare const categoriesService: {
    getAllCategoriesFromDB: () => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
        icon: string | null;
        isActive: boolean;
    }[]>;
};
//# sourceMappingURL=categories.service.d.ts.map