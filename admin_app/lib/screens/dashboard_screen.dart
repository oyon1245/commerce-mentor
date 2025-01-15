import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:commerce_mentor_admin/services/auth_service.dart';
import 'package:commerce_mentor_admin/widgets/admin_drawer.dart';
import 'package:commerce_mentor_admin/widgets/stats_card.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({Key? key}) : super(key: key);

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Admin Dashboard'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              context.read<AuthService>().signOut();
            },
          ),
        ],
      ),
      drawer: const AdminDrawer(),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Overview',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 16),
            GridView.count(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisCount: 2,
              mainAxisSpacing: 16,
              crossAxisSpacing: 16,
              childAspectRatio: 1.5,
              children: const [
                StatsCard(
                  title: 'Total Students',
                  value: '150',
                  icon: Icons.people,
                  color: Colors.blue,
                ),
                StatsCard(
                  title: 'Active Courses',
                  value: '5',
                  icon: Icons.school,
                  color: Colors.green,
                ),
                StatsCard(
                  title: 'Inquiries',
                  value: '12',
                  icon: Icons.message,
                  color: Colors.orange,
                ),
                StatsCard(
                  title: 'Revenue',
                  value: '₹50,000',
                  icon: Icons.currency_rupee,
                  color: Colors.purple,
                ),
              ],
            ),
            const SizedBox(height: 24),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Quick Actions',
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: 16),
                    Wrap(
                      spacing: 16,
                      runSpacing: 16,
                      children: [
                        _buildActionButton(
                          context,
                          'Add Course',
                          Icons.add_circle,
                          () {
                            // Navigate to add course screen
                          },
                        ),
                        _buildActionButton(
                          context,
                          'Update Schedule',
                          Icons.calendar_today,
                          () {
                            // Navigate to schedule screen
                          },
                        ),
                        _buildActionButton(
                          context,
                          'View Inquiries',
                          Icons.message,
                          () {
                            // Navigate to inquiries screen
                          },
                        ),
                        _buildActionButton(
                          context,
                          'Send Notice',
                          Icons.notifications,
                          () {
                            // Navigate to notifications screen
                          },
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Recent Activities',
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: 16),
                    _buildActivityItem(
                      'New course added: Advanced Accounts',
                      '2 hours ago',
                      Icons.add_circle,
                      Colors.green,
                    ),
                    _buildActivityItem(
                      'Schedule updated for Economics',
                      '5 hours ago',
                      Icons.update,
                      Colors.blue,
                    ),
                    _buildActivityItem(
                      'New inquiry received',
                      '1 day ago',
                      Icons.message,
                      Colors.orange,
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActionButton(
    BuildContext context,
    String label,
    IconData icon,
    VoidCallback onPressed,
  ) {
    return ElevatedButton.icon(
      onPressed: onPressed,
      icon: Icon(icon),
      label: Text(label),
      style: ElevatedButton.styleFrom(
        padding: const EdgeInsets.symmetric(
          horizontal: 16,
          vertical: 12,
        ),
      ),
    );
  }

  Widget _buildActivityItem(
    String title,
    String time,
    IconData icon,
    Color color,
  ) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12.0),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: color.withOpacity(0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(
              icon,
              color: color,
              size: 20,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: Theme.of(context).textTheme.bodyLarge,
                ),
                Text(
                  time,
                  style: Theme.of(context).textTheme.bodySmall,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
