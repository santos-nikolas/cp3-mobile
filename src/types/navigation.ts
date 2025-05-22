type Home = {
  History: undefined;
  Fiction: undefined;
};

//Parâmetros para a rota de detalhes do post
type PostDetails = {
  postId: number;
};

// Lista de todas as telas no StackNavigator principal
type RootStack = {
  HomeTabs: undefined; // Rota para o nosso BottomTabNavigator
  PostDetails: PostDetails; // Rota para a tela de detalhes
};

export { Home, PostDetails, RootStack};
