type Home = {
  History: undefined;
  Fiction: undefined;
};

//Parâmetros para a rota de detalhes do post
type PostDetail = {
  postId: number;
};

// Lista de todas as telas no StackNavigator principal
type RootStack = {
  HomeTabs: undefined; // Rota para o nosso BottomTabNavigator
  PostDetail: PostDetail; // Rota para a tela de detalhes
};

export { Home, PostDetail, RootStack};
