<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220704155926 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE exam ADD CONSTRAINT FK_38BBA6C6AFC2B591 FOREIGN KEY (module_id) REFERENCES module (id)');
        $this->addSql('CREATE INDEX IDX_38BBA6C6AFC2B591 ON exam (module_id)');
        $this->addSql('ALTER TABLE question ADD module_id INT NOT NULL');
        $this->addSql('ALTER TABLE question ADD CONSTRAINT FK_B6F7494EAFC2B591 FOREIGN KEY (module_id) REFERENCES module (id)');
        $this->addSql('CREATE INDEX IDX_B6F7494EAFC2B591 ON question (module_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE exam DROP FOREIGN KEY FK_38BBA6C6AFC2B591');
        $this->addSql('DROP INDEX IDX_38BBA6C6AFC2B591 ON exam');
        $this->addSql('ALTER TABLE question DROP FOREIGN KEY FK_B6F7494EAFC2B591');
        $this->addSql('DROP INDEX IDX_B6F7494EAFC2B591 ON question');
        $this->addSql('ALTER TABLE question DROP module_id');
    }
}
