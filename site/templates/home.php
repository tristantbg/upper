<?php snippet('header') ?>

<div id="post-it-container">

<?php foreach ($pages->visible()->children()->visible() as $key => $postit): ?>

	<div class="post-it <?= tagslug($postit->parent()->title()) ?>-item <?= $postit->size() ?><?php e($postit->fullbleed()->bool(), ' full') ?>"<?php e($postit->color()->isNotEmpty(), 'style="background-color: '.$postit->color().'"') ?>>
		<div class="topbar">
			<h2><?= $postit->title()->html() ?></h2>
		</div>
		<div class="item-content">
			<?php if($postit->text()->isNotEmpty()): ?>
				<div class="text item-content-item"><?= $postit->text()->kt() ?></div>
			<?php endif ?>
			<?php $list = $postit->list()->toStructure() ?>
			<?php if($list->count() > 0): ?>
				<div class="list item-content-item">
				<?php foreach ($list as $key => $i): ?>
				<table class="index">
					<tbody>
						<tr>
							<td><?= $i->left()->kt() ?></td>
							<td><p></p></td>
							<td><?= $i->right()->kt() ?></td>
						</tr>
					</tbody>
				</table>
				<?php endforeach ?>
				</div>
			<?php endif ?>
		</div>
	</div>

<?php endforeach ?>

</div>

<?php snippet('footer') ?>