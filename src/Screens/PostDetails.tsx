import { RootStack } from "@/types/navigation"; // Certifique-se que esses tipos existem e estão corretos
import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type PostDetailsRouteProp = RouteProp<RootStack, 'PostDetails'>;

const PostDetails = () => {
    const route = useRoute<PostDetailsRouteProp>();
    const { postId } = route.params;

    return (
        <View style={styles.container_commit1}>
            <Text style={styles.text_commit1}>Tela de Detalhes do Post</Text>
            <Text style={styles.text_commit1}>Post ID Recebido: {postId}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container_commit1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    text_commit1: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default PostDetails;