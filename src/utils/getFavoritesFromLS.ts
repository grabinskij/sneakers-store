export const getFavoritesFromLS = () => {
    const data = localStorage.getItem('favorites')
    const items = data ? JSON.parse(data) : []
    return [...items] as Array<number>
}


