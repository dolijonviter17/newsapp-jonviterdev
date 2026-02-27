import Container from "@/components/container";
import { useLocalSearchParams } from "expo-router";
import React from "react";
// import { WebView } from "react-native-webview";

export default function ArticleWebView() {
  const params = useLocalSearchParams<{ url: string; title?: string }>();

  const url = params.url as string;
  const title = (params.title as string) || "Artikel";

  return (
    <Container onDetail title={title}>
      {/* <WebView source={{ uri: url }} /> */}
    </Container>
  );
}
