import 'package:flutter/material.dart';

class HighlightsSection extends StatelessWidget {
  const HighlightsSection({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GridView.count(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      crossAxisCount: 2,
      mainAxisSpacing: 16,
      crossAxisSpacing: 16,
      childAspectRatio: 1.5,
      children: const [
        HighlightCard(
          icon: Icons.star,
          title: '10+ Years',
          subtitle: 'of Experience',
        ),
        HighlightCard(
          icon: Icons.people,
          title: '1000+',
          subtitle: 'Students Taught',
        ),
        HighlightCard(
          icon: Icons.school,
          title: '95%',
          subtitle: 'Success Rate',
        ),
        HighlightCard(
          icon: Icons.workspace_premium,
          title: 'Expert',
          subtitle: 'Faculty',
        ),
      ],
    );
  }
}

class HighlightCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;

  const HighlightCard({
    Key? key,
    required this.icon,
    required this.title,
    required this.subtitle,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      child: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              icon,
              size: 32,
              color: Theme.of(context).primaryColor,
            ),
            const SizedBox(height: 8),
            Text(
              title,
              style: Theme.of(context).textTheme.titleLarge,
              textAlign: TextAlign.center,
            ),
            Text(
              subtitle,
              style: Theme.of(context).textTheme.bodyMedium,
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
