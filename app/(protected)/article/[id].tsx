import Container from "@/components/container";
import Text from "@/components/Text";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, Pressable, ScrollView, View } from "react-native";

type UIArticle = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  time: string;
  imageUrl?: string;
  url?: string;
  author?: string;
  content?: string;
  publishedAt?: string;
};

function formatDateID(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function ArticleDetailScreen() {
  const params = useLocalSearchParams<{ id: string; article?: string }>();

  const article: UIArticle | null = React.useMemo(() => {
    if (!params.article) return null;
    try {
      return JSON.parse(params.article as string) as UIArticle;
    } catch {
      return null;
    }
  }, [params.article]);

  if (!article) {
    return (
      <Container>
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-white/70">Data artikel tidak ditemukan.</Text>
          <Pressable
            onPress={() => router.back()}
            className="mt-4 rounded-2xl bg-white/10 px-5 py-3"
          >
            <Text className="text-white font-semibold">Kembali</Text>
          </Pressable>
        </View>
      </Container>
    );
  }

  return (
    <Container onDetail title="Detail">
      {/* <StatusBar barStyle="light-content" /> */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 16,
          paddingBottom: 28,
        }}
      >
        {/* Hero image */}
        {article.imageUrl ? (
          <View className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
            <Image
              source={{ uri: article.imageUrl }}
              className="h-56 w-full"
              resizeMode="cover"
            />
          </View>
        ) : null}

        {/* Meta */}
        <View className="mt-5 flex-row items-center">
          <View className="rounded-full bg-black/10 dark:bg-white/10 px-3 py-1">
            <Text className="text-[12px]">{article.category}</Text>
          </View>

          <Text className="ml-4 text-[12px]">{article.time}</Text>

          {article.publishedAt ? (
            <>
              <View className="mx-3 h-1 w-1 rounded-full bg-white/30" />
              <Text className="text-[12px]">
                {formatDateID(article.publishedAt)}
              </Text>
            </>
          ) : null}
        </View>

        {/* Title */}
        <Text className="mt-4 text-[28px] leading-8">{article.title}</Text>

        {article.author ? (
          <Text className="mt-3 text-[14px]">By {article.author}</Text>
        ) : null}

        {/* Divider */}
        <View className="my-6 h-px bg-white/10" />

        {/* Content */}
        <Text className="text-[16px] leading-7">
          {article.content ||
            article.excerpt ||
            "Konten tidak tersedia. Silakan buka sumber lengkap."}
        </Text>

        <Pressable
          onPress={() =>
            router.push({
              pathname: "/article/webview",
              params: { url: article.url, title: article.category },
            })
          }
          className="mt-8 items-center justify-center rounded-2xl bg-white/10 py-4"
        >
          <Text className="text-[15px] font-semibold text-white">
            Baca selengkapnya
          </Text>
        </Pressable>
      </ScrollView>
    </Container>
  );
}
