import React, {useContext, useState} from 'react';

const SelectedCategoryContext = React.createContext();
const SelectedCategoryUpdateContext = React.createContext();

export function useSelectedCategory(){
    return useContext(SelectedCategoryContext);
}

export function useSelectedCategoryUpdate() {
    return useContext(SelectedCategoryUpdateContext);
}

export function CategoryProvider({children}) {
    const [selectedCategory, setSelectedCategory] = useState(0);

    return (
        <SelectedCategoryContext.Provider value={selectedCategory}>
            <SelectedCategoryUpdateContext.Provider value={setSelectedCategory}>
                {children}
            </SelectedCategoryUpdateContext.Provider>
        </SelectedCategoryContext.Provider>
    );
}