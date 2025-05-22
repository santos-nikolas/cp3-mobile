import { RootStack } from "@/types/navigation"; // Certifique-se que esses tipos existem e estão corretos
import { RouteProp, useRoute } from "@react-navigation/native";
import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import { PostDetail } from "@/types";
import { dummyApi } from "@/api";
import { ActivityIndicator } from "react-native";
import { ScrollView } from "react-native";

type PostDetailsRouteProp = RouteProp<RootStack, 'PostDetails'>;

const PostDetails = () => {
    const route = useRoute<PostDetailsRouteProp>();
    const { postId } = route.params;

   const [post, setPost] = useState<PostDetail | null>(null);
  const [loadingPost, setLoadingPost] = useState(true);
  const [errorPost, setErrorPost] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      if (!postId) return; // Segurança caso postId não venha
      setLoadingPost(true);
      setErrorPost(null);
      try {
        const response = await dummyApi.get<PostDetail>(`/post/${postId}`);
        setPost(response.data);
      } catch (e) {
        console.error("Erro ao buscar post:", e);
        setErrorPost("Falha ao carregar os detalhes do post.");
      } finally {
        setLoadingPost(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  if (loadingPost) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando detalhes do post...</Text>
      </View>
    );
  }

  if (errorPost) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{errorPost}</Text>
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.centered}>
        <Text>Post não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      <View style={styles.tagsContainer}>
        <Text style={styles.tagsTitle}>Tags:</Text>
        {post.tags.map((tag, index) => (
          <Text key={index} style={styles.tagItem}>
            {tag}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
  },
  tagsContainer: {
        marginTop: 16,
        marginBottom: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',  
    },
    tagsTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#444",
        width: '100%',
    },
    tagItem: {
        backgroundColor: "#e0e0e0",
        color: "#333",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        marginRight: 8,
        marginBottom: 8,
    },
});

export default PostDetails;