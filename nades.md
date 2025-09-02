# Nade & Tactic Models

This document provides a comprehensive overview of the `Nade` model, which is used for managing in-game grenade data. It extends the abstract `Tactic` model, inheriting its core functionality and adding specific fields and methods for grenades.

## Nade Model (`Nade`)

The `Nade` model represents a single grenade utility or a combination of grenades. It inherits common fields and behaviors from the `Tactic` model, such as title, description, and status.

### Fields

* `type` (PositiveSmallIntegerField): The type of grenade (e.g., smoke, flash, molotov).
* `nades` (ManyToManyField): A self-referential many-to-many relationship that links different `Nade` instances to form a combo. This relationship is managed through the `ComboNade` model.
* `coordinates` (CharField): The in-game `setpos` and `setang` coordinates for throwing the grenade. It includes a validator to ensure the format is correct.
* `motion` (PositiveSmallIntegerField): The type of motion used to throw the grenade (e.g., jump-throw, running throw).
* `throw` (PositiveSmallIntegerField): The specific throwing method (e.g., left-click, right-click, combination).
* `imported_from` (ForeignKey): The `Library` from which the nade was imported.
* `library` (ForeignKey): The `Library` that this nade belongs to.
* `destinations` (ManyToManyField): Links to `Callout` objects representing where the grenade lands.
* `positions` (ManyToManyField): Links to `Callout` objects representing the thrower's position.
* `travel_time` (DecimalField): The time it takes for a smoke grenade to travel to its destination.

### Properties

* `team`: Returns the `Team` associated with the nade's library.
* `submission`: Returns the most recent `NadeSubmission` if the nade has been submitted.
* `is_linked`: A boolean property that returns `True` if the nade is part of a combo.

### Methods

* `get_personalization_params()`: Returns a dictionary of parameters for personalization.
* `import_from()`: Overrides the parent method to handle nade-specific import logic, including cloning linked nades, destinations, positions, and screenshots.
* `delete_submission_entity()`: Deletes the submitted copy of the nade.
* `submit_entity()`: Submits the nade to the global Metastack library by creating a new `Nade` instance with a `SUBMITTED` status and a `NadeSubmission` record.
* `_import_linked_nades()`: A private helper method for importing all `Nade` instances that are part of a combo. It handles different scenarios, such as importing into a Metastack team or a user's team.
* `_import_destinations()`: A private helper method for importing and linking the destination `Callout` objects. It uses a configuration to handle different team types (Metastack vs. non-Metastack).
* `_import_positions()`: A private helper method for importing and linking the position `Callout` objects, similar to `_import_destinations`.
* `_get_filter_config()`: A private helper method that determines the correct field configuration for filtering `Callout` objects based on whether the original and target teams are Metastack.
* `_import_screenshots()`: A private helper method that clones and attaches `Image` instances to the newly imported nade.
* `get_main_image()`: A method that returns the primary image for the nade. For combo nades, it finds the main image of the first linked nade in the combo.

---

## Associated Models

### Image Model (`Image`)

The `Image` model stores data for screenshots related to a `Nade`.

#### Fields
* `title` (CharField): A title for the image.
* `description` (TextField): A description of the image.
* `source` (ImageField): The image file itself.
* `nade` (ForeignKey): A link back to the `Nade` this image belongs to.
* `is_main` (BooleanField): A flag indicating if this is the main image for the nade.
* `order` (PositiveSmallIntegerField): The display order of the image.

---

### Nade Status History Model (`NadeStatusHistory`)

This model tracks the status changes of a `Nade` instance.

#### Fields
* `status` (PositiveSmallIntegerField): The new status of the nade.
* `changed_by` (ForeignKey): The `Player` who changed the status.
* `changed_at` (DateTimeField): The timestamp of the status change.
* `change_comment` (TextField): Optional comments about the status change.
* `nade` (ForeignKey): A link back to the `Nade` instance.
