# Strategy & Tactic Models

This document provides a comprehensive overview of the `Strategy` and `Tactic` models, their fields, and associated methods. These models are the core of the application's gameplay and content management system.

## Tactic Model (`Tactic`)

The `Tactic` model is an **abstract base class** that serves as the foundation for main entities like `Strategy`. It provides a common set of fields and methods for all derived models, ensuring consistency and reusability.

### Fields

* `title` (CharField): The title of the tactic, with a maximum length of 50 characters.
* `description` (JSONField): A flexible field for storing a JSON object that describes the tactic.
* `tags` (ManyToManyField): Links the tactic to multiple `Tag` objects, allowing for categorization and filtering.
* `created_by` (ForeignKey): A link to the `Player` who created the tactic.
* `edited_by` (ForeignKey): A link to the last `Player` who edited the tactic.
* `map` (ForeignKey): The map associated with the tactic.
* `status` (PositiveSmallIntegerField): The current status of the tactic (e.g., draft, submitted).
* `side` (PositiveSmallIntegerField): The side (e.g., offense, defense) the tactic is for.
* `area` (ManyToManyField): Links the tactic to multiple `Area` objects, representing specific locations on the map.
* `youtube_url` (URLFieldOptionalSchema): A URL field for linking to a YouTube video, with optional schema.

### Properties

* `is_system`: A boolean property that returns `True` if the tactic is a system-generated entity from the Metastack source.
* `metastack_entity`: Returns the original Metastack entity if the tactic is a system entity; otherwise, it returns `None`.

### Methods

* `__str__`: Returns a human-readable string representation of the tactic.
* `clone()`: Creates a deep copy of the tactic instance, including its related `tags` and `area` relationships.
* `import_from()`: A method used to create an imported instance of a tactic.

---

## Strategy Model (`Strategy`)

The `Strategy` model extends the `Tactic` abstract base class. It is used to store data related to a full gameplay round, including the overall idea, context, and a link to a demo.

### Fields

* `demo_url` (URLFieldOptionalSchema): A URL field for linking to a gameplay demo.
* `round` (CharField): The specific round number associated with the strategy.
* `demo_tick` (CharField): The exact tick number in the demo where the strategy begins. This field includes a validator to ensure it's a number and doesn't start with zero.
* `types` (ManyToManyField): Links the strategy to multiple `StrategyType` objects, allowing for further classification (e.g., economy round, pistol round).
* `imported_from` (ForeignKey): A link to the `Playbook` from which this strategy was imported.
* `pro_team` (ForeignKey): A link to a `ProTeam` if the strategy originated from a professional team's playbook.
* `playbook` (ForeignKey): The `Playbook` to which this strategy belongs.

### Properties

* `team`: A property that returns the `Team` associated with the strategy's playbook.
* `submission`: A property that returns the most recent `StrategySubmission` related to this strategy, if one exists.

### Methods

* `get_personalization_params()`: Returns a dictionary of parameters used for personalizing the strategy.
* `clone()`: Overrides the parent `clone()` method to also copy the `types` relationships.
* `import_from()`: Overrides the parent method to handle strategy-specific import logic, including the creation and assignment of `StrategyRole` instances.
* `_import_strategy_roles()`: A private helper method that creates copies of `StrategyRole` instances and assigns them to the new strategy. It also handles the complex logic of mapping roles between different teams.
* `_get_team_role_or_none()`: A private helper method for finding a matching `Role` for a specific team, handling cases for both Metastack and non-Metastack teams.
* `save()`: Overrides the default save method. If the `side` or `map` fields have changed, it deletes any associated `StrategyListItem` entries.
* `submit_entity()`: Creates and submits a new copy of the strategy to the global Metastack playbook.

---

## Strategy Role Model (`StrategyRole`)

The `StrategyRole` model is a supporting model used to store data for a specific role within a `Strategy`.

### Fields

* `name` (CharField): The name of the role.
* `description` (JSONField): A JSON field for describing the role.
* `weapon` (PositiveSmallIntegerField): The weapon associated with this role.
* `strategy` (ForeignKey): A link back to the `Strategy` this role belongs to.
* `role` (ForeignKey): A link to a global `Role` entity.
* `order` (PositiveSmallIntegerField): The order of the role within the strategy.

### Methods

* `__str__`: Returns a string representation of the role's name.
* `clone()`: Creates a deep copy of the role instance and resets its primary key and related strategy.

---
