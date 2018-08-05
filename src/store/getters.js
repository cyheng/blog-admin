const getters = {
    token:state=>`Bearer ${state.user.token}`,
    roles:state=>state.user.roles,
    name:state=>state.user.name,
    avatar:state=>state.user.avatar,
    introduction:state=>state.user.introduction,
    category:state=>state.category.category,
    isLoadingCategory:state=>state.category.isLoading,
    categoryTotal:state=>state.category.total,
}

export default getters