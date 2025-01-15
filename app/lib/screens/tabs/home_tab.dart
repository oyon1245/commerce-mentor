import 'package:flutter/material.dart';
import 'package:commerce_mentor/widgets/hero_banner.dart';
import 'package:commerce_mentor/widgets/highlights_section.dart';
import 'package:commerce_mentor/widgets/cta_button.dart';

class HomeTab extends StatelessWidget {
  const HomeTab({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const HeroBanner(
                imageUrl: 'assets/images/hero_image.jpg',
                title: 'Commerce Mentor',
                subtitle: 'Excel in Commerce with Expert Guidance',
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Welcome to Commerce Mentor',
                      style: Theme.of(context).textTheme.displayMedium,
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Expert guidance by Sanjib Sir for your commerce education journey',
                      style: Theme.of(context).textTheme.bodyLarge,
                    ),
                    const SizedBox(height: 24),
                    const HighlightsSection(),
                    const SizedBox(height: 24),
                    CTAButton(
                      label: 'View Courses',
                      onPressed: () {
                        // Navigate to courses tab
                      },
                    ),
                    const SizedBox(height: 32),
                    Card(
                      child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Why Choose Us?',
                              style: Theme.of(context).textTheme.titleLarge,
                            ),
                            const SizedBox(height: 16),
                            _buildFeatureItem(
                              context,
                              Icons.school,
                              'Expert Faculty',
                              'Learn from experienced teachers',
                            ),
                            _buildFeatureItem(
                              context,
                              Icons.trending_up,
                              'Proven Results',
                              'Consistent high performance by our students',
                            ),
                            _buildFeatureItem(
                              context,
                              Icons.access_time,
                              'Flexible Schedule',
                              'Choose from multiple batches',
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildFeatureItem(
    BuildContext context,
    IconData icon,
    String title,
    String description,
  ) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: Theme.of(context).primaryColor.withOpacity(0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(
              icon,
              color: Theme.of(context).primaryColor,
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                Text(
                  description,
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
