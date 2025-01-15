import 'package:flutter/material.dart';

class AdminDrawer extends StatelessWidget {
  const AdminDrawer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          DrawerHeader(
            decoration: BoxDecoration(
              color: Theme.of(context).primaryColor,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                const CircleAvatar(
                  radius: 30,
                  backgroundImage: AssetImage('assets/images/admin_avatar.png'),
                ),
                const SizedBox(height: 8),
                Text(
                  'Admin Panel',
                  style: Theme.of(context).textTheme.titleLarge?.copyWith(
                    color: Colors.white,
                  ),
                ),
                Text(
                  'Commerce Mentor',
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: Colors.white70,
                  ),
                ),
              ],
            ),
          ),
          _buildDrawerItem(
            context,
            'Dashboard',
            Icons.dashboard,
            () {
              Navigator.pop(context);
            },
          ),
          _buildDrawerItem(
            context,
            'Courses',
            Icons.school,
            () {
              // Navigate to courses management
            },
          ),
          _buildDrawerItem(
            context,
            'Students',
            Icons.people,
            () {
              // Navigate to students management
            },
          ),
          _buildDrawerItem(
            context,
            'Schedule',
            Icons.calendar_today,
            () {
              // Navigate to schedule management
            },
          ),
          _buildDrawerItem(
            context,
            'Inquiries',
            Icons.message,
            () {
              // Navigate to inquiries
            },
          ),
          _buildDrawerItem(
            context,
            'Notifications',
            Icons.notifications,
            () {
              // Navigate to notifications
            },
          ),
          _buildDrawerItem(
            context,
            'Reports',
            Icons.bar_chart,
            () {
              // Navigate to reports
            },
          ),
          const Divider(),
          _buildDrawerItem(
            context,
            'Settings',
            Icons.settings,
            () {
              // Navigate to settings
            },
          ),
          _buildDrawerItem(
            context,
            'Profile',
            Icons.person,
            () {
              // Navigate to profile
            },
          ),
        ],
      ),
    );
  }

  Widget _buildDrawerItem(
    BuildContext context,
    String title,
    IconData icon,
    VoidCallback onTap,
  ) {
    return ListTile(
      leading: Icon(icon),
      title: Text(title),
      onTap: onTap,
    );
  }
}
