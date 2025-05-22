import { RootStack } from "@/types/navigation"; // Certifique-se que esses tipos existem e estão corretos
import { RouteProp, useRoute } from "@react-navigation/native";
import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, FlatList } from "react-native";
import { PostDetail, Comment, CommentsResponse } from "@/types";
import { dummyApi } from "@/api";

type PostDetailsRouteProp = RouteProp<RootStack, 'PostDetails'>;

const PostDetails = () => {
    const route = useRoute<PostDetailsRouteProp>();
    const { postId } = route.params;

    const [post, setPost] = useState<PostDetail | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loadingPost, setLoadingPost] = useState(true);
    const [loadingComments, setLoadingComments] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
        if (!postId) return;
        setLoadingPost(true);
        setLoadingComments(true);
        setError(null);

        try {
            const response = await dummyApi.get<PostDetail>(`/post/${postId}`);
            setPost(response.data);
        } catch (e) {
            console.error("Erro ao buscar post:", e);
            setError("Falha ao carregar os detalhes do post.");
            setLoadingPost(false);
            setLoadingComments(false);
        } finally {
            setLoadingPost(false);
        }  

        try {
            const Response = await dummyApi.get<CommentsResponse>(`/comments/post/${postId}`);
            setComments(Response.data.comments);
        }
        catch (e) {
            console.error("Erro ao buscar comentários:", e);
            setError(error ? error + "\nFalha ao carregar os comentários." : "Falha ao carregar os comentários.")
        }
        finally {
            setLoadingComments(false);
        }
    };
    fetchData();
    }, [postId]);

    const renderCommentItem = ({ item }: {item: Comment}) => (
        <View style={styles.commentContainer}>
            <Text style={styles.commentUser}>{item.user.username}</Text>
            <Text style={styles.commentBody}>{item.body}</Text>
            <Text style={styles.commentLikes}>Likes: {item.likes}</Text>
        </View>
    )

    if (loadingPost) {
        return (
        <View style={styles.centered}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Carregando detalhes do post...</Text>
        </View>
        );
    }

    if (error && !post) {
        return (
        <View style={styles.centered}>
            <Text style={styles.errorText}>{error}</Text>
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

    const renderCommentsSection = () => {
        if (loadingComments) {
            return <ActivityIndicator size="small" color="#0000ff" />;
        }

        if (error && comments.length === 0) {
            return <Text style={styles.errorText}>Falha ao carregar comentários.</Text>
        }

        if (comments.length > 0) {
            return (
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={(item) => item.id.toString()}
                    // nestedScrollEnabled={true}
                />
            );
        }

    return <Text>nenhum Comentário ainda.</Text>
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

      <Text style={styles.noCommentsText}>Comentários: </Text>
      {renderCommentsSection()}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 16 
    },
    centered: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center" 
    },
    errorText: { 
        color: "red", 
        fontSize: 16, 
        textAlign: 'center' 
    },
    title: { 
        fontSize: 24, 
        fontWeight: "bold", 
        marginBottom: 12, 
        color: "#333" 
    },
    body: { 
        fontSize: 16, 
        lineHeight: 24, 
        marginBottom: 16, 
        color: "#555" 
    },
    tagsContainer: { 
        marginTop: 16, 
        marginBottom: 20, 
        flexDirection: 'row', 
        flexWrap: 'wrap' 
    },
    tagsTitle: { 
        fontSize: 18, 
        fontWeight: "bold", 
        marginBottom: 8, 
        color: "#444", 
        width: '100%' 
    },
    tagItem: { 
        backgroundColor: "#e0e0e0", 
        color: "#333", 
        paddingHorizontal: 10, 
        paddingVertical: 5, 
        borderRadius: 15, 
        marginRight: 8, 
        marginBottom: 8 
    },
    commentsHeader: { 
        fontSize: 20, 
        fontWeight: "bold", 
        marginTop: 20, 
        marginBottom: 10, 
        borderTopWidth: 1, 
        borderTopColor: "#eee", 
        paddingTop: 10 
    },
    commentContainer: { 
        paddingVertical: 10, 
        borderBottomWidth: 1, 
        borderBottomColor: "#f0f0f0" 
    },
    commentUser: { 
        fontWeight: "bold", 
        color: "#007BFF", 
        marginBottom: 4 
    },
    commentBody: { 
        fontSize: 14, 
        color: "#666", 
        marginBottom: 4 
    },
    commentLikes: { 
        fontSize: 12, 
        color: "#888" 
    },
    noCommentsText: { 
        fontStyle: "italic", 
        color: "#777", 
        paddingVertical: 10 
    },
});

export default PostDetails;