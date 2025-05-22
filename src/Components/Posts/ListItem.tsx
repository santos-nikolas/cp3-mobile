import { Post } from "@/types";
import {
  faEye,
  faHeart,
  faHeartBroken,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"; 
import { useNavigation } from "@react-navigation/native"; 
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "@/types/navigation";

type ListItemProps = {
  post: Post;
};

type PostListNavigationProp = NativeStackNavigationProp<
  RootStack,
  'PostDetails' 
>;

const ListItem = ({ post }: ListItemProps) => {
  const navigation = useNavigation<PostListNavigationProp>();

  const handlePress = () => {
    navigation.navigate('PostDetails', { postId: post.id });
  };

  return (
    <TouchableOpacity onPress={handlePress}> 
      <View style={styles.container}>
        <Text style={styles.title}>{post.title}</Text>
        <View style={styles.reactions}>
          <FontAwesomeIcon icon={faHeart} color="red" />
          <Text>{post.reactions.likes}</Text>
          <FontAwesomeIcon icon={faHeartBroken} color="#5539CC" />
          <Text>{post.reactions.dislikes}</Text>
          <FontAwesomeIcon icon={faEye} />
          <Text>{post.views}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 16,
    color: "#1f1f1f",
    fontWeight: "bold",
  },
  reactions: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
});

export default ListItem;