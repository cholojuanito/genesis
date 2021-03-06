'use strict';

const Command = require('../../models/Command.js');
const EventEmbed = require('../../embeds/ConstructionEmbed.js');
const { captures } = require('../../CommonFunctions');

/**
 * Displays the current simaris target
 */
class Construction extends Command {
  /**
   * Constructs a callable command
   * @param {Genesis} bot  The bot object
   */
  constructor(bot) {
    super(bot, 'warframe.worldstate.construction', 'construction', 'Display current construction progress.');
    this.regex = new RegExp(`^${this.call}(?:\\s+on\\s+${captures.platforms})?$`, 'i');
  }

  async run(message, ctx) {
    const platformParam = message.strippedContent.match(this.regex)[1];
    const platform = platformParam || ctx.platform;
    const ws = await this.bot.worldStates[platform.toLowerCase()].getData();
    const embed = new EventEmbed(this.bot, ws.constructionProgress, platform.toUpperCase());
    await this.messageManager.embed(message, embed, true, true);
    return this.messageManager.statuses.SUCCESS;
  }
}

module.exports = Construction;
