import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { BookOpen, Search, BookMarked, Lightbulb, Brain } from 'lucide-react-native';
import { resourceCategories, articles } from '@/data/resources';

export default function ResourcesScreen() {
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Resources</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Learn and grow every day
        </Text>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Search size={20} color={colors.textSecondary} />
          <Text style={[styles.searchPlaceholder, { color: colors.textSecondary }]}>
            Search resources...
          </Text>
        </View>
      </View>
      
      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoriesScroll}
        >
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'all' && { backgroundColor: colors.primary },
            ]}
            onPress={() => setSelectedCategory('all')}
          >
            <BookOpen 
              size={18} 
              color={selectedCategory === 'all' ? '#fff' : colors.text} 
            />
            <Text 
              style={[
                styles.categoryText, 
                { color: selectedCategory === 'all' ? '#fff' : colors.text }
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          
          {resourceCategories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && { backgroundColor: colors.primary },
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              {category.id === 'meditation' && (
                <Brain 
                  size={18} 
                  color={selectedCategory === category.id ? '#fff' : colors.text} 
                />
              )}
              {category.id === 'productivity' && (
                <Lightbulb 
                  size={18} 
                  color={selectedCategory === category.id ? '#fff' : colors.text} 
                />
              )}
              {category.id === 'psychology' && (
                <BookMarked 
                  size={18} 
                  color={selectedCategory === category.id ? '#fff' : colors.text} 
                />
              )}
              <Text 
                style={[
                  styles.categoryText, 
                  { color: selectedCategory === category.id ? '#fff' : colors.text }
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <ScrollView style={styles.articlesContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.featuredSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Featured</Text>
          
          <View style={[styles.featuredCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80' }} 
              style={styles.featuredImage} 
            />
            <View style={styles.featuredContent}>
              <View style={[styles.featuredTag, { backgroundColor: colors.primaryLight }]}>
                <Text style={[styles.featuredTagText, { color: colors.primary }]}>
                  Psychology
                </Text>
              </View>
              <Text style={[styles.featuredTitle, { color: colors.text }]}>
                The Science of Habit Formation
              </Text>
              <Text style={[styles.featuredExcerpt, { color: colors.textSecondary }]}>
                Learn how your brain forms habits and how to use this knowledge to build better routines.
              </Text>
              <TouchableOpacity style={[styles.readButton, { backgroundColor: colors.primary }]}>
                <Text style={styles.readButtonText}>Read Article</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={styles.articlesSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {selectedCategory === 'all' ? 'All Resources' : resourceCategories.find(c => c.id === selectedCategory)?.name}
          </Text>
          
          <View style={styles.articlesList}>
            {filteredArticles.map(article => (
              <TouchableOpacity 
                key={article.id} 
                style={[styles.articleCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                <Image 
                  source={{ uri: article.imageUrl }} 
                  style={styles.articleImage} 
                />
                <View style={styles.articleContent}>
                  <View style={[styles.articleTag, { backgroundColor: colors.primaryLight }]}>
                    <Text style={[styles.articleTagText, { color: colors.primary }]}>
                      {resourceCategories.find(c => c.id === article.category)?.name}
                    </Text>
                  </View>
                  <Text style={[styles.articleTitle, { color: colors.text }]}>
                    {article.title}
                  </Text>
                  <Text style={[styles.articleExcerpt, { color: colors.textSecondary }]} numberOfLines={2}>
                    {article.excerpt}
                  </Text>
                  <Text style={[styles.articleReadTime, { color: colors.textSecondary }]}>
                    {article.readTime} min read
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.journalSection}>
          <View style={[styles.journalCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.journalHeader}>
              <Text style={[styles.journalTitle, { color: colors.text }]}>Daily Journal</Text>
              <BookMarked size={24} color={colors.primary} />
            </View>
            <Text style={[styles.journalSubtitle, { color: colors.textSecondary }]}>
              Reflect on your journey and track your progress
            </Text>
            <TouchableOpacity style={[styles.journalButton, { backgroundColor: colors.primary }]}>
              <Text style={styles.journalButtonText}>Open Journal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
  },
  searchPlaceholder: {
    marginLeft: 10,
    fontSize: 16,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#E8E8E8',
  },
  categoryText: {
    marginLeft: 5,
    fontWeight: '600',
    fontSize: 14,
  },
  articlesContainer: {
    flex: 1,
  },
  featuredSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },
  featuredCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 3,
  },
  featuredImage: {
    width: '100%',
    height: 180,
  },
  featuredContent: {
    padding: 15,
  },
  featuredTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  featuredTagText: {
    fontWeight: '600',
    fontSize: 12,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  featuredExcerpt: {
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 20,
  },
  readButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  readButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  articlesSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  articlesList: {
    gap: 15,
  },
  articleCard: {
    flexDirection: 'row',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 3,
  },
  articleImage: {
    width: 100,
    height: 100,
  },
  articleContent: {
    flex: 1,
    padding: 12,
  },
  articleTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  articleTagText: {
    fontWeight: '600',
    fontSize: 10,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  articleExcerpt: {
    fontSize: 12,
    marginBottom: 5,
    lineHeight: 16,
  },
  articleReadTime: {
    fontSize: 12,
    fontWeight: '500',
  },
  journalSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  journalCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 3,
  },
  journalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  journalTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  journalSubtitle: {
    fontSize: 14,
    marginBottom: 15,
  },
  journalButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  journalButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});