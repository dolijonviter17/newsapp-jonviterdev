import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  time: string;
  content: string[];
};

const MOCK_ARTICLE: Article = {
  id: "1",
  title: "Kebijakan Baru: Perubahan Jam Operasional Layanan",
  excerpt:
    "Mulai minggu ini, layanan akan menyesuaikan jam operasional untuk meningkatkan kualitas...",
  category: "Info",
  time: "2 jam lalu",
  content: [
    "Mulai minggu ini, layanan akan menyesuaikan jam operasional untuk meningkatkan kualitas dan kecepatan penanganan.",
    "Perubahan ini dilakukan untuk memastikan tim dapat merespons lebih cepat pada jam-jam sibuk dan menjaga kualitas layanan tetap stabil.",
    "Silakan cek menu Bantuan untuk melihat jam layanan terbaru sesuai wilayah kamu.",
    "Jika kamu memiliki pertanyaan, hubungi customer support melalui fitur chat di aplikasi.",
  ],
};

const RELATED: Article[] = [
  {
    id: "2",
    title: "Tips Aman Bertransaksi di Aplikasi",
    excerpt:
      "Kenali ciri-ciri penipuan dan cara menjaga keamanan akun kamu saat melakukan transaksi...",
    category: "Keamanan",
    time: "Kemarin",
    content: [],
  },
  {
    id: "3",
    title: "Update Fitur: Notifikasi Lebih Pintar",
    excerpt:
      "Sekarang kamu bisa mengatur notifikasi berdasarkan kategori dan prioritas yang kamu mau...",
    category: "Update",
    time: "3 hari lalu",
    content: [],
  },
];

function MetaRow({ category, time }: { category: string; time: string }) {
  return (
    <View className="flex-row items-center">
      <View className="rounded-full bg-white/10 px-3 py-1">
        <Text className="text-[12px] font-medium text-white/80">
          {category}
        </Text>
      </View>

      <View className="mx-3 h-1 w-1 rounded-full bg-white/30" />

      <Text className="text-[12px] text-white/55">{time}</Text>
    </View>
  );
}

function RelatedCard({
  item,
  onPress,
}: {
  item: Article;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="mb-4 rounded-3xl border border-white/10 bg-white/5 px-5 py-4"
    >
      <View className="mb-2 flex-row items-center">
        <View className="rounded-full bg-white/10 px-3 py-1">
          <Text className="text-[12px] font-medium text-white/80">
            {item.category}
          </Text>
        </View>
        <View className="mx-3 h-1 w-1 rounded-full bg-white/30" />
        <Text className="text-[12px] text-white/55">{item.time}</Text>
      </View>

      <Text
        className="text-[16px] font-semibold leading-6 text-white"
        numberOfLines={2}
      >
        {item.title}
      </Text>
      <Text
        className="mt-2 text-[13px] leading-5 text-white/55"
        numberOfLines={2}
      >
        {item.excerpt}
      </Text>
    </Pressable>
  );
}

const DetailScreen = () => {
  const article = MOCK_ARTICLE;

  return (
    <SafeAreaView className="flex-1 bg-[#060B12]">
      <StatusBar barStyle="light-content" />

      {/* Top Bar */}
      <View className="px-6 pt-2">
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => {
              // TODO: navigation.goBack()
              router.back();
            }}
            className="h-12 w-12 items-center justify-center rounded-full bg-white/10"
          >
            <Text className="text-xl text-white">‹</Text>
          </Pressable>

          <View className="flex-row items-center gap-3">
            <Pressable
              onPress={() => console.log("Bookmark")}
              className="h-12 w-12 items-center justify-center rounded-full bg-white/10"
            >
              <Text className="text-lg text-white">★</Text>
            </Pressable>

            <Pressable
              onPress={() => console.log("Share")}
              className="h-12 w-12 items-center justify-center rounded-full bg-white/10"
            >
              <Text className="text-lg text-white">↗</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 18,
          paddingBottom: 28,
        }}
      >
        {/* Meta */}
        <MetaRow category={article.category} time={article.time} />

        {/* Title */}
        <Text className="mt-4 text-[28px] font-extrabold leading-8 text-white">
          {article.title}
        </Text>

        {/* Sub / excerpt */}
        <Text className="mt-3 text-[15px] leading-6 text-white/55">
          {article.excerpt}
        </Text>

        {/* Divider */}
        <View className="my-6 h-px bg-white/10" />

        {/* Content */}
        <View className="gap-4">
          {article.content.map((p, idx) => (
            <Text key={idx} className="text-[16px] leading-7 text-white/75">
              {p}
            </Text>
          ))}
        </View>

        {/* CTA box (optional) */}
        <View className="mt-8 rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
          <Text className="text-[16px] font-semibold text-white">
            Butuh bantuan?
          </Text>
          <Text className="mt-2 text-[14px] leading-6 text-white/55">
            Jika ada pertanyaan terkait perubahan layanan, kamu bisa hubungi tim
            support langsung dari menu Bantuan di aplikasi.
          </Text>

          <Pressable
            onPress={() => console.log("Open Help")}
            className="mt-4 items-center justify-center rounded-2xl bg-white/10 py-3"
          >
            <Text className="text-[14px] font-semibold text-white">
              Buka Bantuan
            </Text>
          </Pressable>
        </View>

        {/* Related */}
        <View className="mt-10">
          <Text className="text-[18px] font-bold text-white">
            Artikel terkait
          </Text>
          <Text className="mt-1 text-[14px] text-white/45">
            Baca juga update lain yang mungkin kamu butuhkan
          </Text>

          <View className="mt-4">
            {RELATED.map((it) => (
              <RelatedCard
                key={it.id}
                item={it}
                onPress={() => console.log("Open related:", it.id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;
