class UserRole:
    OWNER = 'OWNER'
    MANAGER = 'MANAGER'
    WORKER = 'WORKER'

    CHOICES = [
        (OWNER, 'Owner'),
        (MANAGER, 'Manager'),
        (WORKER, 'Worker'),
    ]