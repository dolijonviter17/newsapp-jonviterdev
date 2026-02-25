import { useAuth } from "@/context/auth";
import { apiClient } from "@/services/client";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  time: string;
  image: string;
};

type UIArticle = {
  id: string;
  title: string;
  excerpt: string;
  category: string; // source name
  time: string; // "2 jam lalu"
  imageUrl?: string;
};

function ArticleCard({
  item,
  onPress,
}: {
  item: UIArticle;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="mb-5 overflow-hidden rounded-[28px] border border-white/10 bg-white/5"
    >
      <View className="flex-row">
        {/* Thumbnail */}
        <View className="h-28 w-28 bg-white/5">
          {item.imageUrl ? (
            <Image
              source={{ uri: item.imageUrl }}
              className="h-28 w-28"
              resizeMode="cover"
            />
          ) : (
            <View className="h-28 w-28 items-center justify-center">
              <Text className="text-white/40">No Image</Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View className="flex-1 px-5 py-4">
          {/* Meta row */}
          <View className="mb-2 flex-row items-center">
            <View className="rounded-full bg-white/10 px-3 py-1">
              <Text className="text-[12px] font-medium text-white/75">
                {item.category}
              </Text>
            </View>

            <Text className="ml-4 text-[12px] text-white/55">{item.time}</Text>
          </View>

          <Text
            className="text-[18px] font-extrabold leading-6 text-white"
            numberOfLines={2}
          >
            {item.title}
          </Text>

          <Text
            className="mt-2 text-[14px] leading-5 text-white/50"
            numberOfLines={2}
          >
            {item.excerpt}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const DashboardScreen = () => {
  const { user } = useAuth();
  const [articles, setArticles] = React.useState<UIArticle[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  function timeAgoID(dateString: string) {
    const d = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMin = Math.floor(diffMs / (1000 * 60));
    if (diffMin < 1) return "baru saja";
    if (diffMin < 60) return `${diffMin} menit lalu`;

    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour} jam lalu`;

    const diffDay = Math.floor(diffHour / 24);
    if (diffDay === 1) return "Kemarin";
    if (diffDay < 7) return `${diffDay} hari lalu`;

    // fallback: tanggal
    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }
  const load = async () => {
    try {
      const res = await apiClient.get(
        "/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=921ba5b747274facb0fa0541e919b455",
      );
      const raw = res.data?.articles ?? [];

      const mapped: UIArticle[] = raw
        .filter((a: any) => a?.title) // minimal valid
        .map((a: any, idx: number) => ({
          id: a.url ?? String(idx),
          title: a.title ?? "-",
          excerpt: a.description ?? a.content ?? "Tidak ada deskripsi",
          category: a.source?.name ?? "Artikel",
          time: a.publishedAt ? timeAgoID(a.publishedAt) : "",
          imageUrl: a.urlToImage ?? undefined,
        }));

      setArticles(mapped);
    } catch (e) {
      console.log("Fetch error:", e);
      setArticles([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  React.useEffect(() => {
    load();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    load();
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0B0F17]">
      <View className="px-6 pt-4">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-4">
            <Text
              className="text-3xl font-extrabold text-white"
              numberOfLines={2}
            >
              Hi, {user.name}
            </Text>
            <Text className="mt-2 text-base text-white/50">
              Selamat datang di layanan kita
            </Text>
          </View>

          <Pressable
            onPress={() => router.push("/profile")}
            className="h-14 w-14 items-center justify-center rounded-full bg-white/10"
          >
            <Text className="text-xl text-white">🔔</Text>
          </Pressable>
        </View>
      </View>

      {/* List */}

      <View className="mt-8 px-6">
        <Text className="text-[22px] font-bold text-white">
          Artikel untuk kamu
        </Text>
        <Text className="mt-1 text-[15px] text-white/45">
          Update terbaru & rekomendasi
        </Text>
      </View>

      {loading ? (
        <View className="mt-10 items-center">
          <ActivityIndicator color="#ffffff" />
        </View>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(it) => it.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 18,
            paddingBottom: 28,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#ffffff"
            />
          }
          renderItem={({ item }) => (
            <ArticleCard
              item={item}
              onPress={() => {
                router.push({
                  pathname: "/article/[id]",
                  params: {
                    id: item.id,
                    article: JSON.stringify(item), // kirim data full
                  },
                });
                // TODO: navigation to detail, passing item
                console.log("open:", item.id);
              }}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({});
